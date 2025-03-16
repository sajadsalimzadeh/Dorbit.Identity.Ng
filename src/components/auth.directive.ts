import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs";
import {AuthRepository} from "@identity";

@Directive({
  selector: '[auth]',
})
export class AuthDirective implements OnInit, OnDestroy {
  private hasView = false;
  private subscription = new Subscription();
  private accesses: string[] = [];
  private needleAccesses?: string[];

  @Input() set auth(value: string | string[] | undefined) {
    this.needleAccesses = (typeof value === 'string' ? [value?.toLowerCase()] : value?.map(x => x?.toLowerCase()));
    this.render();
  }

  constructor(
    private authRepository: AuthRepository,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(this.authRepository.$accesses.subscribe(e => {
      this.accesses = e;
      this.render();
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  render() {
    console.log(this.accesses)
    let granted: boolean;
    if (this.needleAccesses && this.needleAccesses.length > 0) {
      granted = !!this.needleAccesses.find(x => this.accesses.includes(x))
    } else {
      granted = true;
    }
    if (granted && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!granted && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

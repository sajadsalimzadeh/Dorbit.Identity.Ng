import { Component, Injector, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { AccessRepository } from "@identity/repositories/access.repository";
import { TranslateModule } from "@ngx-translate/core";
import { PrimengComponent } from "@primeng/components/primeng.component";
import { TreeNode } from "primeng/api";
import { IftaLabelModule } from "primeng/iftalabel";
import { TreeSelectModule } from "primeng/treeselect";

@Component({
    standalone: true,
    imports: [IftaLabelModule, TreeSelectModule, ReactiveFormsModule, TranslateModule],
    selector: 'app-access-selector',
    templateUrl: './index.component.html',
    styleUrl: './index.component.scss'
})
export class AccessSelectorComponent extends PrimengComponent {
    @Input() label: string = 'access-selector.label';
    @Input({ required: true }) control!: FormControl<string[] | null>;

    innerControl = new FormControl<TreeNode[]>([]);

    nodes: TreeNode[] = [];

    constructor(injector: Injector, protected accessRepository: AccessRepository) {
        super(injector);
    }

    override ngOnInit() {
        this.subscription.add(this.accessRepository.getAll().subscribe(res => {
            const accesses = res.data ?? [];
            this.nodes = accesses.map(access => ({
                key: access.id,
                label: access.name,
                data: access,
            }));

            const selectedAccesses = this.control.value ?? [];
            this.nodes.forEach(node => {
                node.checked = selectedAccesses.includes(node.data.name);
                node.children = this.nodes.filter(n => n.data.parentId === node.key);
            });
            this.innerControl.setValue(this.nodes.filter(node => node.checked));

            this.nodes = this.nodes.filter(node => !node.data.parentId);
        }));

        this.subscription.add(this.innerControl.valueChanges.subscribe(value => {
            this.control.setValue(value?.map(v => v.data.name) ?? []);
        }));
    }
}

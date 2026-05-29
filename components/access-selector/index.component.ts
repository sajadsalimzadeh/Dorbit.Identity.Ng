import { CommonModule } from "@angular/common";
import { Component, forwardRef, Injector, Input } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { TreeUtil } from "@framework/utils";
import { Access } from "@identity/contracts/access";
import { AccessRepository } from "@identity/repositories/access.repository";
import { TranslateModule } from "@ngx-translate/core";
import { PrimengControlComponent } from "@primeng/components/primeng-control.component";
import { TreeNode } from "primeng/api";
import { IftaLabelModule } from "primeng/iftalabel";
import { TreeSelectModule } from "primeng/treeselect";

let isLoadingAccesses = false;
const listeners: ((accesses: Access[]) => void)[] = [];

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule, TreeSelectModule, IftaLabelModule],
    selector: 'app-access-selector',
    templateUrl: './index.component.html',
    styleUrl: './index.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AccessSelectorComponent),
            multi: true
        }
    ]
})
export class AccessSelectorComponent extends PrimengControlComponent {
    @Input() label: string = 'access-selector.label';
    @Input() filterBy: string[] = [];

    innerControl = new FormControl<TreeNode[]>([]);

    nodes: TreeNode[] = [];

    constructor(injector: Injector, protected accessRepository: AccessRepository) {
        super(injector);
    }

    override ngOnInit() {
        this.load();

        this.subscription.add(this.innerControl.valueChanges.subscribe(value => {
            this.onChange?.(value?.map(v => v.data.name) ?? []);
        }));
    }

    load() {
        if (isLoadingAccesses) {
            listeners.push((accesses) => this.process(accesses));
            return;
        }
        isLoadingAccesses = true;
        this.subscription.add(this.accessRepository.getAll().subscribe(res => {
            isLoadingAccesses = false;
            const accesses = res.data ?? [];
            listeners.forEach(listener => listener(accesses));
            listeners.clear();
            this.process(accesses);
        }));
    }

    process(accesses: Access[]) {
        this.nodes = accesses.map(access => ({
            key: access.id,
            label: access.name,
            data: access,
        }));
        this.nodes.forEach(node => {
            node.children = this.nodes.filter(n => n.data.parentId === node.key);
        });

        const selectedAccesses = this.value ?? [];
        this.nodes = this.nodes.filter(node => !node.data.parentId);

        const filters = this.filterBy.map(filter => filter.toLowerCase());
        if (filters.length > 0) {
            this.nodes = this.nodes.filter(node => filters.includes(node.data.name.toLowerCase()));
        }

        const selectedNodes: TreeNode[] = [];
        TreeUtil.iterate(this.nodes, node => {
            node.checked = selectedAccesses.includes(node.data.name);
            if (node.checked) {
                selectedNodes.push(node);
            }
        });
        if (this.nodes.length === 1) {
            this.nodes[0].expanded = true;
        }
        this.innerControl.setValue(selectedNodes);
    }
}

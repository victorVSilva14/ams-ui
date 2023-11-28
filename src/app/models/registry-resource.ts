export class RegistryResource {
    id?: number;
	entryDateTime?: Date;
	exitDateTime?: Date;

    constructor(init?: Partial<RegistryResource>) {
        Object.assign(this, init);
    }
}
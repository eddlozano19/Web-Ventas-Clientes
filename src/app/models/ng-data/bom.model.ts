export class BomModel {
    constructor(
        public bom: BoModel
    ) {
    }
}

export class BoModel {
    constructor(
        public admInfo: any,
        public table: any []
    ) {
    }
}

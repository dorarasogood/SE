export class DiagnosisDataModel {
	items;

	constructor(){
		this.items = [
			new DiagnosisData("Radiology", "CT brains: large tumor sphenoid/clivus."),
			new DiagnosisData("Haematology test", "Core lab"),
			new DiagnosisData("Laboratory test", "Blood culture tested positive on staphylococcus aureus"),
		]
	}
}

export class DiagnosisData {
	category;
	conclusion;

	constructor(category, conclusion){
		this.category = category;
		this.conclusion = conclusion;
	}
}
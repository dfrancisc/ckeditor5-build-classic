

import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';


export default class HeadingCommand extends Command {

	constructor( editor, modelElements ) {
		super( editor );
		this.modelElements = modelElements;
	}


	refresh() {
		const block = first( this.editor.model.document.selection.getSelectedBlocks() );

		this.value = !!block && this.modelElements.includes( block.name ) && block.name;
		this.isEnabled = !!block && this.modelElements.some( heading => checkCanBecomeHeading( block, heading, this.editor.model.schema ) );
	}


	execute( options ) {
		const model = this.editor.model;
		const document = model.document;

		const modelElement = options.value;

		model.change( writer => {
			const blocks = Array.from( document.selection.getSelectedBlocks() )
				.filter( block => {
					return checkCanBecomeHeading( block, modelElement, model.schema );
				} );

			for ( const block of blocks ) {
				if ( !block.is( modelElement ) ) {
					writer.rename( block, modelElement );
				}
			}
		} );
	}
}

function checkCanBecomeHeading( block, heading, schema ) {
	return schema.checkChild( block.parent, heading ) && !schema.isObject( block );
}

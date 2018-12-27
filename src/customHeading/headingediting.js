
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import HeadingCommand from './headingcommand';

import priorities from '@ckeditor/ckeditor5-utils/src/priorities';
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';

const defaultModelElement = 'sectionparagraph';


export default class SectionHeadingEditing extends Plugin {

	constructor( editor ) {
		super( editor );

		editor.config.define( 'sectionHeading', {
			options: [
				{ model: 'sectionparagraph', title: 'Paragraph', class: 'ck-sectionheading_paragraph' },
				{ model: 'sectionheading1', view: 'h2', title: 'Heading 1', class: 'ck-sectionheading_heading1' },
				{ model: 'sectionheading2', view: 'h3', title: 'Heading 2', class: 'ck-sectionheading_heading2' },
				{ model: 'sectionheading3', view: 'h4', title: 'Heading 3', class: 'ck-sectionheading_heading3' }
			]
		} );
	}

	static get requires() {
		return [ Paragraph ];
	}


	init() {
		const editor = this.editor;
		const options = editor.config.get( 'sectionHeading.options' );

		const modelElements = [];

		for ( const option of options ) {
			// Skip paragraph - it is defined in required Paragraph feature.
			if ( option.model !== defaultModelElement ) {
				// Schema.
				editor.model.schema.register( option.model, {
					inheritAllFrom: '$block'
				} );

				editor.conversion.elementToElement( option );

				modelElements.push( option.model );
			}
		}

		this._addDefaultH1Conversion( editor );

		// Register the heading command for this option.
		editor.commands.add( 'sectionHeading', new HeadingCommand( editor, modelElements ) );
	}


	afterInit() {
		// If the enter command is added to the editor, alter its behavior.
		// Enter at the end of a heading element should create a paragraph.
		const editor = this.editor;
		const enterCommand = editor.commands.get( 'enter' );
		const options = editor.config.get( 'sectionHeading.options' );

		if ( enterCommand ) {
			this.listenTo( enterCommand, 'afterExecute', ( evt, data ) => {
				const positionParent = editor.model.document.selection.getFirstPosition().parent;
				const isHeading = options.some( option => positionParent.is( option.model ) );

				if ( isHeading && !positionParent.is( defaultModelElement ) && positionParent.childCount === 0 ) {
					data.writer.rename( positionParent, "paragraph" );
				}
			} );
		}
	}


	_addDefaultH1Conversion( editor ) {
		editor.conversion.for( 'upcast' ).add( upcastElementToElement( {
			model: 'sectionheading1',
			view: 'h1',
			// With a `low` priority, `paragraph` plugin autoparagraphing mechanism is executed. Make sure
			// this listener is called before it. If not, `h1` will be transformed into a paragraph.
			converterPriority: priorities.get( 'low' ) + 1
		} ) );
	}
}

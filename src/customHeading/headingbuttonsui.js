

// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

// import { getLocalizedOptions } from './utils';
// import iconHeading1 from '../theme/icons/heading1.svg';
// import iconHeading2 from '../theme/icons/heading2.svg';
// import iconHeading3 from '../theme/icons/heading3.svg';
// const defaultModelElement = 'sectionparagraph';

// const defaultIcons = {
// 	heading1: iconHeading1,
// 	heading2: iconHeading2,
// 	heading3: iconHeading3
// };

// export default class HeadingButtonsUI extends Plugin {

	
// 	init() {
// 		const options = getLocalizedOptions( this.editor );
		
// 		options
// 			.filter( item => item.model !== defaultModelElement )
// 			.map( item => this._createButton( item ) );
// 	}


	
// 	_createButton( option ) {
// 		const editor = this.editor;

// 		editor.ui.componentFactory.add( option.model, locale => {
// 			const view = new ButtonView( locale );
// 			const command = editor.commands.get( 'sectionHeading' );

// 			view.label = option.title;
// 			view.icon = option.icon || defaultIcons[ option.model ];
// 			view.tooltip = true;
// 			view.bind( 'isEnabled' ).to( command );
// 			view.bind( 'isOn' ).to( command, 'value', value => value == option.model );

// 			view.on( 'execute', () => {
// 				editor.execute( 'sectionHeading', { value: option.model } );
// 			} );

// 			return view;
// 		} );
// 	}
// }

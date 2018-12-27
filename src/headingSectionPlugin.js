import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';;
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg'

export default class __headingSection extends Plugin {
    
    init() {
        
        const editor = this.editor;
        const t = editor.t;
        const options = getLocalizedOptions( editor );
        const defaultTitle = t('Add image');
        const dropdownTooltip = t('Image');

        editor.ui.componentFactory.add('headingSection', locale => {

            const dropdownView = createDropdown( locale );

            dropdownView.set({
                label: 'Image',
                tooltip: true
            });
            dropdownView.buttonView.set( {
                label: 'some-label',
				isOn: false,
				withText: true,
				tooltip: dropdownTooltip
            });
            dropdownView.extendTemplate( {
				attributes: {
					class: [
						'ck-image-dropdown'
					]
				}
			});

            // The collection of the list items.
            const items = new Collection();

            items.add( {
                type: 'button',
                model: new Model( {
                    label: 'some-label',
                })
            });

            items.add( {
                type: 'button',
                model: new Model( {
                    label: 'some-label 2',
                })
            });

            // Create a dropdown with a list inside the panel.
            addListToDropdown( dropdownView, items );

            return dropdownView;
        });
    }
}



function getLocalizedOptions( editor ) {
	const t = editor.t;
	const localizedTitles = {
		Paragraph: t( 'Paragraph' ),
		'Heading 1': t( 'Heading 1' ),
		'Heading 2': t( 'Heading 2' ),
		'Heading 3': t( 'Heading 3' )
	};

	return editor.config.get( 'heading.options' ).map( option => {
		const title = localizedTitles[ option.title ];

		if ( title && title != option.title ) {
			option.title = title;
		}

		return option;
	} );
}

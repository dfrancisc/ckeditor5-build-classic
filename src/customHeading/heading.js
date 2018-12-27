

import SectionHeadingEditing from './headingediting';
import SectionHeadingUI from './headingui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class SectionHeading extends Plugin {

	static get requires() {
		return [ SectionHeadingEditing, SectionHeadingUI ];
	}
	
	static get pluginName() {
		return 'sectionHeading';
	}
}

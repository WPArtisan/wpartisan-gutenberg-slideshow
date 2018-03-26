const { __ } = wp.i18n;
const {
	registerBlockType,
	RichText,
	MediaUpload,
	ImagePlaceholder
} = wp.blocks;
const { Button } = wp.components;
const { pick } = _;

registerBlockType( 'wpartisan/gutenberg-slideshow', {
	title: __( 'Slideshow' ),
	icon: 'index-card',
	category: 'common',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		images: {
			type: 'array',
			source: 'children',
			selector: 'img',
		},
	},
	edit: props => {
		const focusedEditable = props.focus ? props.focus.editable || 'title' : null;
		const attributes = props.attributes;

		const onChangeTitle = value => {
			props.setAttributes( { title: value } );
		};
		const onFocusTitle = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'title' } ) );
		};
		const onSelectImages = images => {
			props.setAttributes( {
				images: images.map( ( image ) => pick( image, [ 'alt', 'caption', 'id', 'url' ] ) ),
			} );
		};

		const controls = 'Controls';

		const title = <RichText
			tagName="h2"
			placeholder={ __( 'Title (Optional)' ) }
			value={ attributes.title }
			onChange={ onChangeTitle }
			focus={ focusedEditable === 'title' }
			onFocus={ onFocusTitle }
		/>

		const ImageGrid = (
			<div>
				{ attributes.images && (
					attributes.images.map( ( image ) => <img src={ image.url } alt={ image.alt } /> )
				) }
			</div>
		);

		if ( ! attributes.images ) {
			return [
				controls,
				title,
				<ImagePlaceholder key="gallery-placeholder"
					className='Images'
					icon="format-gallery"
					label={ __( 'Slideshow' ) }
					onSelectImage={ onSelectImages }
					multiple
				/>,
			];
		}

		return [
			controls,
			title,
			ImageGrid
		];

	},
	save: props => {
		const {
			className,
			attributes: {
				title,
				mediaURL,
				ingredients,
				instructions
			}
		} = props;
		return (
			<div className={ className }>
				<h2>
					{ title }
				</h2>
				{
					mediaURL && (
						<img className="recipe-image" src={ mediaURL } />
					)
				}
				<ul className="ingredients">
					{ ingredients }
				</ul>
				<div className="steps">
					{ instructions }
				</div>
			</div>
		);
	}
} );

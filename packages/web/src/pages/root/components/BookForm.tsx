import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { addBookSchema } from '@book-tracker/shared';
import { Formik } from 'formik';

import { useAddBookMutation } from '../../../query-hooks/useAddBookMutation';

const useStyles = makeStyles((theme) => {
	return createStyles({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: '94%',
			maxWidth: 400,
		},
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
		},
		iconButton: {
			padding: 10,
		},
		divider: {
			height: 28,
			margin: 4,
		},
	});
});

const BookForm = () => {
	const classes = useStyles();
	const addBookMutation = useAddBookMutation();

	return (
		<Formik
			initialValues={{ title: '' }}
			validationSchema={addBookSchema}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				await addBookMutation.mutateAsync(values.title);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<>
					<Paper
						component='form'
						className={classes.root}
						onSubmit={handleSubmit as any}
					>
						<InputBase
							className={classes.input}
							placeholder='e.g.: Your Awesome Book'
							inputProps={{ 'aria-label': 'add a book' }}
							name='title'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.title}
							error={!!errors.title && touched.title}
						/>
						<Divider className={classes.divider} orientation='vertical' />
						<IconButton
							color='primary'
							className={classes.iconButton}
							aria-label='directions'
							type='submit'
							disabled={isSubmitting}
						>
							<AddIcon />
						</IconButton>
					</Paper>
					<div style={{ color: '#c00' }}>
						{errors.title && touched.title && errors.title}
					</div>
				</>
			)}
		</Formik>
	);
};

export default BookForm;

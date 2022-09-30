import { Avatar, Box, Button, Card, FormHelperText, Grid, Grow, Typography } from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

const FileUpload = ({
	onChange = undefined
}: {
	onChange?: (file: any) => void | undefined;
}) => {
	const [selectedFile, setSelectedFile] = useState<any>();
	const [isSelected, setIsSelected] = useState(false);
	const [preview, setPreview] = useState<string>()

	const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined)
			return
		}
		const objectUrl = URL.createObjectURL(selectedFile)

		// console.log(objectUrl);
		setPreview(objectUrl);

		handleSubmission();

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
}, [selectedFile])

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('key', process.env.REACT_APP_IMAGE_UPLOAD_KEY as string);
		formData.append('media', selectedFile);
		// console.log(selectedFile)

		axios.post('https://thumbsnap.com/api/upload', formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
			)
			.then((response) => {
				onChange !== undefined && onChange(response.data.data.media);
			})
			.catch((err) => {
				onChange !== undefined && onChange(null);

				if (err.response.data.error) {
					console.log(err.response.data.error);
					//When trouble shooting, simple informations about the error can be found in err.response.data.error so it's good to display it
				}
			});
		};

	return(
		<Card variant="outlined">
			
			<Grid container p={4} spacing={2}>
				{isSelected ? (
					<>
						<Grid item xs={12} p={1}>
							{selectedFile &&  <Avatar alt="Employee Photo" src={preview} />}
						</Grid>
						<FormHelperText>Filename: {selectedFile.name}</FormHelperText>
					</>
				) : null}
				<Grid item xs={12}>
					<Button variant="contained" component="label">
						Upload Photo
						<input hidden accept="image/*" multiple type="file" name="file" onChange={changeHandler} />
					</Button>
				</Grid>	
			</Grid>
		</Card>
	)
}

export default FileUpload;
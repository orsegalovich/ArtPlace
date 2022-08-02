import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState, useEffect, useRef, Fragment, onChange, onFileChange, classes, SvgIcon, UploadIcon } from 'react';
import Button from '@mui/material/Button';
import '../styles/AddPostImg.css';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GetSkills from '../data/GetSkills';
import uploadImage from '../pages/UploadImage';
import { getAuth} from 'firebase/auth'
import updatePortfolioInDB from '../components/UpdatePortfolioInDB';


export default function UploadPorfolio(){

    const [image, setImage] = useState(null);
    const [imageURLs, setImageURLs] = useState([]);
    const [imageList, setImageList] = useState([]);
    const auth = getAuth();
    const curr_user = auth.currentUser;


    useEffect(() => {
        if (image == null) return;
        if (imageURLs.length == 6) {
            alert("Only 6 images are Allowed");
            return;
        }
        // Add to imageURLs for presenting
        const newImageURL = URL.createObjectURL(image);
        const tempURLs = [...imageURLs];
        tempURLs.push(newImageURL)
        setImageURLs(tempURLs);
        // Add to imagesList to pass to db
        const tempImageList = [...imageList];
        tempImageList.push(image);
        setImageList(tempImageList);
    }, [image]);

    function handleImageChange(e) {
        setImage(e.target.files[0]);
    }

    function updateImagesClick(e) {
        if (imageList.length != 6) {
            alert("You Have to upload 6 images for your portfolio");
            return;
        }
        updatePortfolioInDB(imageList);
    }

return(
    <>
    <Button onClick={updateImagesClick}>
            send
    </Button>
    <Button
        variant="contained"
        component="label"
        >
        Upload Picture
        <input
            type="file"
            hidden
            onChange={handleImageChange}
            />
    </Button>
    {imageURLs.map(imageSrc => <img src={imageSrc} className="addpostimg" />)}
    </>
);
}
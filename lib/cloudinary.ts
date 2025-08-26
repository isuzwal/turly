import {v2 as cloudinary} from "cloudinary";
cloudinary.config({
     cloud_name:"da0zslcf2",
     api_key:"114981385571337",
     api_secret:"Z3_WZ0JmIYozn-z5cTtJXjjPeXk",
    // cloud_name:process.env.NODE_ENV_CLOUD_NAME,
    // api_key:process.env.NODE_ENV_CLOUD_API_KEY,
    // api_secert:process.env.NODE_ENV_CLOUD_API_SERCERT
})
export  default cloudinary
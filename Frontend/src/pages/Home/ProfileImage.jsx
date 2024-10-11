import React, { useState, useRef, useEffect } from "react";
import axiosBaseURL from "../../Utility/ApiConfig";
import { RiAccountCircleFill } from "react-icons/ri";


const ProfileImage = () => {
  const [image, setImage] = useState(null); // Holds the uploaded image
  const [imgX, setImgX] = useState(0);
  const [imgY, setImgY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Tracks if the image is loaded
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [uploadimage, setUploadimage] = useState(false);
  const [userresult, setUserresult] = useState([]);

  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const croppedCanvasRef = useRef(null);

  // Fetch profile image from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosBaseURL.get("/questions/getQuestions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // console.log("Fetched questions:", response.data);
        setUserresult(response.data.user); // updated
        console.log(response.data.user);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } 
    };

    fetchQuestions();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const draw = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = `translate(${imgX}px, ${imgY}px)`;
    }
  };

  useEffect(() => {
    draw(); // Re-draw image when imgX or imgY changes
  }, [imgX, imgY]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setImgX((prevX) => prevX + dx);
      setImgY((prevY) => prevY + dy);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleImageLoad = () => {
    if (imgRef.current && canvasRef.current) {
      const canvasWidth = canvasRef.current.offsetWidth;
      const canvasHeight = canvasRef.current.offsetHeight;
      setImgX((canvasWidth - imgRef.current.width) / 2);
      setImgY((canvasHeight - imgRef.current.height) / 2);
      setIsImageLoaded(true);
    }
  };

  const handleUploadClick = async () => {
    if (!isImageLoaded) {
      alert("Please select and load an image before uploading.");
      return;
    } else {
      setUploadimage(false);
      alert("Image uploaded successfully");
    }

    const croppedCanvas = document.createElement("canvas");
    const ctx = croppedCanvas.getContext("2d");
    croppedCanvas.width = 150;
    croppedCanvas.height = 150;

    ctx.beginPath();
    ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
    ctx.clip();

    ctx.drawImage(
      imgRef.current,
      imgX,
      imgY,
      imgRef.current.width,
      imgRef.current.height
    );

    croppedCanvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, "croppedImage.png");

      try {
        const response = await axiosBaseURL.post("/images/upload", formData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        const result = response.data;
        if (result.profileImage) {
          setCroppedImageUrl(result.profileImage);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }, "image/png");
  };

  const handlePicture = () => {
    setUploadimage(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1vw",
        zIndex: "999",
        position: "relative",
      }}
    >
      {!uploadimage && (
        <div
          style={{
            borderRadius: "50%",
            width: "6em",
            height: "6em",
            overflow: "hidden",
            position: "relative",
            cursor: "grab",
          }}
        >
          {userresult.profileimg ? (
            <img
              src={`http://localhost:5500${userresult.profileimg}`}
              alt={userresult.profileimg}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <RiAccountCircleFill
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
      )}
      {!uploadimage && (
        <button
          style={{
            Width: "100%",
            marginTop: "1vw",
            backgroundColor: "#1976D2",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            padding: "0.5em",
            fontSize: "font-size: clamp(1rem, 5vw, 3rem)",
          }}
          onClick={handlePicture}
        >
          {userresult.profileimg ? "Change picture" : "upload picture"}
        </button>
      )}
      {uploadimage && (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1em",
            padding: "1em",
            backgroundColor: "white",
            width: "12em",
            height: "16em",
            borderRadius: "1em",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p style={{ fontSize: "1em" }}>Upload an Image</p>
          <form>
            <input
              style={{ marginBottom: "2em" }}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </form>
          <button
            onClick={handleUploadClick}
            style={{
              width: "10em",
              padding: ".2em",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: ".3em",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
           {userresult.profileimg ? "Change" : "Upload"}
          </button>

          <div
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              border: "2px solid #007BFF",
              borderRadius: "50%",
              width: "6em",
              height: "6em",
              overflow: "hidden",
              position: "relative",
              cursor: "grab",
              marginTop: "2em",
            }}
          >
            <img
              ref={imgRef}
              src={image}
              onLoad={handleImageLoad}
              style={{ position: "absolute", top: 0, left: 0, cursor: "move" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;

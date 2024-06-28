// import "./DetailsUser.css";
// import React, { useState, useEffect } from "react";
// import "react-phone-input-2/lib/style.css";
// import PhoneInput from "react-phone-input-2";
// import useLocalStorage from "./useLocalStorage";
// import Navbar from "./Navbar";

// function DetailsUser({ setUser, user }) {
//   const [userList, setUserList] = useState([]);
// 	const [gender, setGender] = useState(user.gender);
// 	const [phone, setPhone] = useState(user.phone);
// 	const [profileImage, setProfileImage] = useState(user.profileImage);
//  	const { getItem, setItem } = useLocalStorage("userList");

//   useEffect(() => {
//     setUserList(getItem() || [] );
//   },[]);

// 	useEffect(() => {
// 		switch (gender) {
// 			case "male":
// 				setProfileImage("/images/profileMen.png");
// 				break;
// 			case "female":
// 				setProfileImage("/images/profileWomen.png");
// 				break;
// 			case "none":
// 			default:
// 				setProfileImage("/images/noneGender.png");
// 				break;
// 		}
// 	}, [gender]);

//   const handleChange = () => {
// 		const updatedUserList = userList.map((u) => {
// 			if (u.id === user.id) {
// 				return { ...u, gender, phone, profileImage };
// 			}
// 			return u;
// 		});
// 		setUserList(updatedUserList);
// 		setItem(updatedUserList);
// 		setUser({ ...user, gender, phone, profileImage });
//   };

// 	return (
// 		<div>
// 			<Navbar user={user} />
// 			<div className="userPage">
// 				<div className="menuUserPage">
// 					<div className="boxUserImage">
// 						<img src={profileImage} alt="Profile" />
// 					</div>
// 					<div className="detailsUser">
// 						<label>Username: {user.userName}</label>
// 						<label>Email: {user.email}</label>
// 						<div>
// 							<label>Gender:</label>
// 							<div className="selectWrapper">
// 								<select
// 									value={gender}
// 									onChange={(e) => setGender(e.target.value)}
// 								>
// 									<option value="none">
// 										Prefer not to say
// 									</option>
// 									<option value="male">Male</option>
// 									<option value="female">Female</option>
// 								</select>
// 							</div>
// 						</div>
// 						<div>
// 							<label>Phone:</label>
// 							<div className="phoneInputWrapper">
// 								<PhoneInput
// 									country={"de"}
// 									value={phone}
// 									onChange={setPhone}
// 									inputProps={{
// 										name: "phone",
// 										required: true,
// 										autoFocus: true,
// 									}}
// 								/>
// 							</div>
// 						</div>
// 						<button
// 							className="btnChangeDetailsUser"
// 							onClick={handleChange}
// 						>
// 							Change
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default DetailsUser;

/*######################### 2 ################################## */
// import "./DetailsUser.css";
// import React, { useState, useEffect } from "react";
// import "react-phone-input-2/lib/style.css";
// import PhoneInput from "react-phone-input-2";
// import useLocalStorage from "./useLocalStorage";
// import Navbar from "./Navbar";
// import axios from "axios";

// function DetailsUser({ setUser, user }) {
// 	const [userList, setUserList] = useState([]);
// 	const [gender, setGender] = useState(user.userGender); // Updated to userGender
// 	const [phone, setPhone] = useState(user.userMNr); // Updated to userMNr
// 	const [profileImage, setProfileImage] = useState(user.profileImage);
// 	const { getItem, setItem } = useLocalStorage("userList");

// 	useEffect(() => {
// 		setUserList(getItem() || []);
// 	}, []);

// 	useEffect(() => {
// 		switch (gender) {
// 			case "male":
// 				setProfileImage("/images/profileMen.png");
// 				break;
// 			case "female":
// 				setProfileImage("/images/profileWomen.png");
// 				break;
// 			case "none":
// 			default:
// 				setProfileImage("/images/noneGender.png");
// 				break;
// 		}
// 	}, [gender]);

// 	const handleChange = async () => {
// 		const updatedUserList = userList.map((u) => {
// 			if (u.id === user.userID) {
// 				return {
// 					...u,
// 					userGender: gender,
// 					userMNr: phone,
// 					profileImage,
// 				};
// 			}
// 			return u;
// 		});
// 		setUserList(updatedUserList);
// 		setItem(updatedUserList);
// 		setUser({ ...user, userGender: gender, userMNr: phone, profileImage });

// 		try {
// 			const response = await axios.put(
// 				"http://localhost:3000/update-user",
// 				{
// 					id: user.userID,
// 					gender,
// 					phone,
// 				}
// 			);
// 			if (response.status === 200) {
// 				console.log("User updated successfully");
// 			}
// 		} catch (error) {
// 			console.error("Error updating user:", error);
// 		}
// 	};

// 	return (
// 		<div>
// 			<Navbar user={user} />
// 			<div className="userPage">
// 				<div className="menuUserPage">
// 					<div className="boxUserImage">
// 						<img src={profileImage} alt="Profile" />
// 					</div>
// 					<div className="detailsUser">
// 						<label>Username: {user.userName}</label>
// 						<label>Email: {user.email}</label>
// 						<div>
// 							<label>Gender:</label>
// 							<div className="selectWrapper">
// 								<select
// 									value={gender}
// 									onChange={(e) => setGender(e.target.value)}
// 								>
// 									<option value="none">
// 										Prefer not to say
// 									</option>
// 									<option value="male">Male</option>
// 									<option value="female">Female</option>
// 								</select>
// 							</div>
// 						</div>
// 						<div>
// 							<label>Phone:</label>
// 							<div className="phoneInputWrapper">
// 								<PhoneInput
// 									country={"de"}
// 									value={phone}
// 									onChange={setPhone}
// 									inputProps={{
// 										name: "phone",
// 										required: true,
// 										autoFocus: true,
// 									}}
// 								/>
// 							</div>
// 						</div>
// 						<button
// 							className="btnChangeDetailsUser"
// 							onClick={handleChange}
// 						>
// 							Change
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default DetailsUser;

/*######################### 3 ################################## */
import "./DetailsUser.css";
import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import useLocalStorage from "./useLocalStorage";
import Navbar from "./Navbar";
import axios from "axios";

function DetailsUser({ setUser, user }) {
	const [userList, setUserList] = useState([]);
	const [gender, setGender] = useState(user.userGender); // Updated to userGender
	const [phone, setPhone] = useState(user.userMNr); // Updated to userMNr
	const [profileImage, setProfileImage] = useState(user.profileImage);
	const { getItem, setItem } = useLocalStorage("userList");

	useEffect(() => {
		setUserList(getItem() || []);
	}, []);

	useEffect(() => {
		switch (gender) {
			case "male":
				setProfileImage("/images/profileMen.png");
				break;
			case "female":
				setProfileImage("/images/profileWomen.png");
				break;
			case "none":
			default:
				setProfileImage("/images/noneGender.png");
				break;
		}
	}, [gender]);

	const handleChange = async () => {
		const updatedUserList = userList.map((u) => {
			if (u.userID === user.userID) {
				return {
					...u,
					userGender: gender,
					userMNr: phone,
					profileImage,
				};
			}
			return u;
		});
		setUserList(updatedUserList);
		setItem(updatedUserList);
		setUser({ ...user, userGender: gender, userMNr: phone, profileImage });

		try {
			const response = await axios.put(
				"http://localhost:3000/update-user",
				{
					userID: user.userID,
					gender,
					phone,
				}
			);
			if (response.status === 200) {
				console.log("User updated successfully");
			}
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	return (
		<div>
			<Navbar user={user} />
			<div className="userPage">
				<div className="menuUserPage">
					<div className="boxUserImage">
						<img src={profileImage} alt="Profile" />
					</div>
					<div className="detailsUser">
						<label>Username: {user.userName}</label>
						<label>Email: {user.email}</label>
						<div>
							<label>Gender:</label>
							<div className="selectWrapper">
								<select
									value={gender}
									onChange={(e) => setGender(e.target.value)}
								>
									<option value="none">
										Prefer not to say
									</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>
						</div>
						<div>
							<label>Phone:</label>
							<div className="phoneInputWrapper">
								<PhoneInput
									country={"de"}
									value={phone}
									onChange={setPhone}
									inputProps={{
										name: "phone",
										required: true,
										autoFocus: true,
									}}
								/>
							</div>
						</div>
						<button
							className="btnChangeDetailsUser"
							onClick={handleChange}
						>
							Change
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailsUser;

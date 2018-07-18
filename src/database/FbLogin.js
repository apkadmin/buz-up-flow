import { FBLoginManager } from "react-native-facebook-login";
const Facebook = {
  login: () => {
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions(["email"], (error, data) => {
        if (!error) {
          resolve(data.credentials.token);
        } else {
          reject(error);
        }
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      FBLoginManager.logout((error, data) => {
        if (!error) {
          resolve(true);
        } else {
          reject(error);
        }
      });
    });
  }
};

export default Facebook;

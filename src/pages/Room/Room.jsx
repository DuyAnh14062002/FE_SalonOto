import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { randomID } from "../../utils/common";

export default function Room() {
  const profile = useSelector((state) => state.userSlice.userInfo);
  const { roomId } = useParams();
  const appId = Number(process.env.REACT_APP_APP_ID);
  console.log("appId",appId)
  const serverSecret = process.env.REACT_APP_SERVER_SECRET;

  let myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      randomID(5),
      profile?.fullname
    );
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      showPreJoinView: false,
      onLeaveRoom: () => {
        window.location.href = "/message";
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}

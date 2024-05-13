import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  const [isMicToggled, setIsMicToggled] = useState(true); // Initially set to true
  const [isVideoToggled, setIsVideoToggled] = useState(true); // Initially set to true

  useEffect(() => {
    // Set isMicToggled and isVideoToggled to false when call starts
    if (callStartsAt && !callTimeNotArrived) {
      setIsMicToggled(false);
      setIsVideoToggled(false);
    }
  }, [callStartsAt, callTimeNotArrived]);

  useEffect(() => {
    // Disable/enable camera and microphone based on isMicToggled and isVideoToggled state
    if (!isMicToggled) {
      call.microphone.disable();
    } else {
      call.microphone.enable();
    }

    if (!isVideoToggled) {
      call.camera.disable();
    } else {
      call.camera.enable();
    }
  }, [isMicToggled, isVideoToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-2 font-medium">
          <span onClick={() => setIsMicToggled(!isMicToggled)}>
            {isMicToggled ? (
              <img src="/icons/mic-on.svg" alt="Mic On" />
            ) : (
              <img src="/icons/mic-off.svg" alt="Mic Off" />
            )}
          </span>
          <span onClick={() => setIsVideoToggled(!isVideoToggled)}>
            {isVideoToggled ? (
              <img src="/icons/video-on.svg" alt="Video On" />
            ) : (
              <img src="/icons/video-off.svg" alt="Video Off" />
            )}
          </span>
        </div>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;

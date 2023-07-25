import React, { useEffect } from "react";
import sound1 from "./sound1.mp3";
// import ion from "ion-sound";
import useSound from "use-sound";

export function Sound1({ isTimerOff }) {
  // ion.sound({
  //   sounds: [
  //     {
  //       name: "sound1.mp3",
  //     },
  //   ],
  //   volume: 0.5,
  //   path: "./",
  //   preload: true,
  //   loop: true,
  // });

  const [sound] = useSound(sound1);

  useEffect(() => {
    if (isTimerOff) {
      sound();
    }
  }, [isTimerOff]);

  return (
    <button type="button" onClick={() => sound()}>
      Run Sound!
    </button>
  );
}

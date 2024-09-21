type AudioSetting = {
  file: string;
  toFormat: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const now = () => new Date().toLocaleTimeString();
const message = (msg: string, obj: object | null = null) =>
  console.log(`${now()}: ${msg}`, obj ?? '');

message('Execution started');

wait(1000).then(() => message('It ran after 1 second'));

const transcriptAudioFile = (audioSetting: AudioSetting) =>
  new Promise(
    (resolve: (settings: AudioSetting) => void, reject: (settings: AudioSetting) => void) => {
      if (Math.random() > 0.5) {
        wait(2000).then(() => {
          return resolve(audioSetting);
        });
      } else {
        wait(3000).then(() => {
          return reject(audioSetting);
        });
      }
    }
  );

transcriptAudioFile({
  file: 'my-audio.mp3',
  toFormat: 'aac'
})
  .then((setting) => message('Your audio files has been converted.', setting))
  .catch((setting) => message("We're unable to convert your audio file", setting));

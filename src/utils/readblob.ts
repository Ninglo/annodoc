export const arrayBufferToString = (buffer: ArrayBuffer): string => {
  return String.fromCharCode.apply(null, Array.from(new Uint16Array(buffer)));
};

const readBlob = (file: File, startByte = 0, stopByte = 0): Promise<string> => {
  const start = startByte;
  const stop = stopByte || file.size - 1;

  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = function (evt) {
      if (evt?.target?.readyState === FileReader.DONE) {
        const { result } = evt.target;
        if (result) {
          resolve(
            result instanceof ArrayBuffer ? arrayBufferToString(result) : result
          );
        } else {
          reject("Result not exist.");
        }
      } else {
        reject("Result not exist.");
      }
    };

    const blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  });
};

export default readBlob;

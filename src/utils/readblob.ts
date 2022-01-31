export const arrayBufferToString = (buffer: ArrayBuffer): string => {
  return String.fromCharCode.apply(null, Array.from(new Uint16Array(buffer)));
};

const readBlob = (
  elementId: string,
  startByte = 0,
  stopByte = 0
): Promise<string> => {
  const inputElement = document.getElementById(
    elementId
  ) as HTMLInputElement | null;
  if (!inputElement || !inputElement.files || !inputElement.files.length) {
    throw new Error("Please select a file!");
  }

  const file = inputElement.files[0];
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

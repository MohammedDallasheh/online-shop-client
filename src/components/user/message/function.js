export const replayRedirectUrl = (message) => {
  const { subject, from, messageType } = message;

  return `new?to=${from?._id}&email=${from?.email}&subject=Replay: ${subject}&type=${messageType}`;
};
export const forwardRedirectUrl = (message) => {
  const { subject, body, messageType } = message;

  return `new?subject=${subject}&body=${body.slice(0, 800)}`;
};

// export default (message, history) => {
//   const { subject, body, from, messageType } = message;

//   return {
//     messageReplay: () =>
//       history.push(
//         `new?to=${from?._id}&email=${from?.email}&subject=Replay: ${subject}&type=${messageType}`
//       ),
//     messageForward: () =>
//       history.push(
//         `new?subject=${subject}&body=${body.slice(0, 800)}`
//       ),
//   };
// };

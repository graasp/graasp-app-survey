import React from 'react';
import DownloadData from '../common/DownloadData';

// eslint-disable-next-line arrow-body-style
const AdminView = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const { data: appContext, isSuccess: isAppContextSuccess } = useAppContext();

//   const [objectQuestions] = useState(
//     questions.map((question, index) => ({
//       id: question,
//       question,
//       position: index,
//     })),
//   );
//   const [objectStudents, setObjectStudents] = useState([]);
//   const [questionStudent, setQuestionStudent] = useState([]);
//   const [disabled, setDisabled] = useState(true);

//   useEffect(() => {
//     if (isAppContextSuccess) {
//       const members = appContext
//         ?.get('members').filter((m) => !FILTERED_IDS.includes(m.id))
//         .map((student) => ({ id: student.id, student: student.name }));
//       setObjectStudents(members);
//     }
//   }, [appContext, isAppContextSuccess]);

//   const {
//     data: appData,
//     isSuccess: isAppDataSuccess,
//     isLoading: isAppDataLoading,
//   } = useAppData();

//   useEffect(() => {
//     if (isAppDataSuccess && !isAppDataLoading) {
//       const newChecks = appData.filter(
//         ({ type }) => type === APP_DATA_TYPES.CHECK,
//       );
//       setQuestionStudent(newChecks);
//       if (
//         newChecks
//           .filter((e) => e.data.state === CHECKBOX_STATES.Empty)
//           .isEmpty() &&
//         !newChecks.isEmpty()
//       ) {
//         setDisabled(false);
//       } else {
//         setDisabled(true);
//       }

//       setSubmitted(!appData.filter(
//         ({ type }) => type === APP_DATA_TYPES.SUBMIT_CONFIRM,
//       ).isEmpty());
//     }
//   }, [appData, isAppDataSuccess, isAppDataLoading]);

  return (
      <div>
          <h2>Admin</h2> {/* TODO: Implement downloader */}
          <DownloadData />
      </div>
  );
};

export default AdminView;
import React, { useContext } from 'react';
import { Context } from './context/ContextContext';
import { DEFAULT_PERMISSION, PERMISSION_LEVELS } from '../config/settings';
import QuestionsView from './main/QuestionsView';
import AdminView from './AdminView/AdminView';

const App = () => {
  const context = useContext(Context);

  const renderContent = () => {
    switch (context?.get('permission', DEFAULT_PERMISSION)) {
      // show teacher view when in producer (educator) mode
      case PERMISSION_LEVELS.ADMIN:
        // case permission:
        return <AdminView />;

      // by default go with the consumer (learner) mode
      case PERMISSION_LEVELS.WRITE:
      case PERMISSION_LEVELS.READ:
      default:
        return <QuestionsView />;
    }
  };

  return renderContent();
};

export default App;

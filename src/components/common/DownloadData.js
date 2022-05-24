import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import { Button } from '@graasp/ui';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { useAppData } from '../context/appData';
import { showErrorToast } from '../../utils/toasts';
import { Context } from '../context/ContextContext';

const useStyles = makeStyles(() => ({
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: '1.05vw',
  },
}));

const DownloadData = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  // const [actions, setActions] = useState([]);

  const [data, setData] = useState([]);

  const [enableDownload, setEnableDownload] = useState(false);

  const context = useContext(Context);

  const {
    data: appData,
    isSuccess: isAppDataSuccess,
    isError: isAppDataError,
  } = useAppData();

  useEffect(() => {
    if (isAppDataError) {
      showErrorToast(t('The app actions could not be loaded.'));
      setEnableDownload(false);
      return;
    }
    if (isAppDataSuccess && !appData?.isEmpty()) {
      setData(appData);
      setEnableDownload(true);
    }
  }, [appData, isAppDataSuccess, isAppDataError]);

  const handleDownload = () => {
    const datetime = new Date().toJSON();

    const blob = new Blob(
      [
        JSON.stringify({
          context: {
            ...Object.fromEntries(context),
            datetime,
          },
          data,
        }),
      ],
      {
        type: 'text/json;charset=utf-8',
      },
    );
    const filename = `app_data_${datetime}.json`;
    saveAs(blob, filename);
  };

  return (
    <div>
      <Typography className={classes.headerText}>
        {t('Download answers.')}
      </Typography>
      <Button
        disabled={!enableDownload}
        variant="contained"
        color="secondary"
        onClick={handleDownload}
      >
        {t('Download data')}
      </Button>
    </div>
  );
};

export default DownloadData;

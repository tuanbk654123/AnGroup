import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SubmissionEditManagement from './components/details'
import { SubmissionHeaderForDetails } from './components/header/for-details'
import { submissionServices } from '../../services/submisstion';
import useUnload from './hooks/useUnload'

export const SubmissionDetailContainer = () => {
  const { id } = useParams();

  useUnload(e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.returnValue = '';
  });

  useEffect(() => {
    submissionServices.updateEditting(true, Number.parseInt(id)).then(res => {
      console.log("Loaded", res);
    });

    return () => {
      submissionServices.updateEditting(false, Number.parseInt(id)).then(res => {
        console.log("Unload", res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white">
      <SubmissionHeaderForDetails />
      <div className="p-4">
        <SubmissionEditManagement />
      </div>
    </div>
  )
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchools } from '../actions/schools';
import { schoolsSelector } from '../selectors/flap';

const Schools = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSchools());
  }, []);

  const schools = useSelector(schoolsSelector);

  return (
    <div>
      <h2>Schools</h2>
      <ul>
        {schools.map(school => (
          <div key={school.CDSCode}>{school.School || school.Website}</div>
        ))}
      </ul>
    </div>
  );
};

export default Schools;

import { useEffect, useState } from 'react';

export default () => {
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      initialize();
    }
  });

  const initialize = async () => {
    setInitialized(true);
  };

  return <div style={{ width: '100%', height: '100%' }}></div>;
};

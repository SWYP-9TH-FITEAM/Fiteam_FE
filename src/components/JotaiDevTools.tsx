import {DevTools} from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';

export const JotaiDevTools = () =>
  process.env.NODE_ENV !== 'production' ? (
    <>
      <style>{css}</style>
      <DevTools />
    </>
  ) : null;

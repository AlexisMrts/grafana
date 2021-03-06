import { createSelector } from 'reselect';
import { ExploreId, ExploreItemState, StoreState } from 'app/types';
import { filterLogLevels, dedupLogRows } from 'app/core/logs_model';

const logsRowsSelector = (state: ExploreItemState) => state.logsResult && state.logsResult.rows;
const hiddenLogLevelsSelector = (state: ExploreItemState) => state.hiddenLogLevels;
const dedupStrategySelector = (state: ExploreItemState) => state.dedupStrategy;
export const deduplicatedRowsSelector = createSelector(
  logsRowsSelector,
  hiddenLogLevelsSelector,
  dedupStrategySelector,
  function dedupRows(rows, hiddenLogLevels, dedupStrategy) {
    if (!(rows && rows.length)) {
      return rows;
    }
    const filteredRows = filterLogLevels(rows, new Set(hiddenLogLevels));
    return dedupLogRows(filteredRows, dedupStrategy);
  }
);

export const isSplit = (state: StoreState) => Boolean(state.explore[ExploreId.left] && state.explore[ExploreId.right]);

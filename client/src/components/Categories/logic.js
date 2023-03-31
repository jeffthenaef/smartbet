import { getCategoryAndMatchedEvents } from 'shared/contracts/contractsData';
import { selectCategory, loading } from 'duck/events';

async function changeCategoryHandler(category, dispatch, optionals = {
  imBusy: false,
}) {
  const { name, slug } = category
  const nextCategory = getCategoryAndMatchedEvents(slug)
  dispatch(selectCategory({
    ...nextCategory,
  }))
}

export {
  changeCategoryHandler,
}

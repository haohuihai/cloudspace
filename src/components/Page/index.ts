import { withInstall } from '/@/utils';

// import pageFooter from './src/PageFooter.vue';
import pageWrapper from './src/PageWrapper.vue';

console.log('PageWrapper', pageWrapper);

// export const PageFooter = withInstall(pageFooter);
export const PageWrapper = withInstall(pageWrapper);

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight';

import '../../sass/style.scss';
import initClickHandler from './clickHandler';
import { determineColorModeSupport } from './colorModeToggle';
import generatePagination from './pagination';
import initMediumZoom from './medium_zoom';
import responsiveTableInit from './responsiveTables';
import toc from './toc';

initClickHandler();
determineColorModeSupport();
generatePagination();
initMediumZoom();
responsiveTableInit();
toc();


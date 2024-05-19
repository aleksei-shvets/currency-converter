import FormConverter from '../components/FormConverter.jsx';
import SelectsConvert from '../components/SelectsConvertForm.jsx';

const Converter = () => (
  <div className="d-flex flex-row flex-wrap">
    <div className="flex-sm-fill container d-inline-flex flex-row justify-content-center flex-wrap rounded p-3 bg-light mb-3">
      <FormConverter />
    </div>
    <div className="container d-inline-flex flex-row justify-content-between flex-wrap rounded p-3 bg-light mb-3">
      <SelectsConvert />
    </div>
  </div>
);

export default Converter;

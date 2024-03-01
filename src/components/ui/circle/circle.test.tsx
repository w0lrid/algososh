import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';
const letters = 'abc';
const head = 'head';
const tail = 'tail';
const index = 0;

describe('Circle component', () => {
  it('renders Circle without letter', () => {
    const tree = renderer.create(<Circle />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with letters', () => {
    const tree = renderer.create(<Circle letter={letters} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with head', () => {
    const tree = renderer.create(<Circle head={head} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with react-component in head', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with tail', () => {
    const tree = renderer.create(<Circle tail={tail} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with react-component in tail', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with index', () => {
    const tree = renderer.create(<Circle index={index} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with isSmall props as true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with Default state', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with Changing state', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Circle with Modified state', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

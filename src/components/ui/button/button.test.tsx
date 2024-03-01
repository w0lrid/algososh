import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

const text = 'text';

describe('Button component', () => {
  it('renders Button with text', () => {
    const tree = renderer.create(<Button text={text} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Button without text', () => {
    const tree = renderer.create(<Button />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('disables Button', () => {
    const tree = renderer
      .create(
        <Button
          text={text}
          disabled
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders loading state Button', () => {
    const tree = renderer.create(<Button isLoader />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles onClick callback', () => {
    window.alert = jest.fn();

    render(
      <Button
        text={text}
        onClick={() => {
          alert('Callback was called properly');
        }}
      />
    );

    const button = screen.getByText(text);

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Callback was called properly');
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('App renders', () => {
	it('correctly', () => {
		const tree = renderer.create(<App />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('App function onClick', () => {
	it('works correctly when "=" is clicked', () => {
		const app = new App();
		app.calculateForDisplay = jest.fn();
		const e = {
			target: { innerHTML: '=' },
		};
		app.onClick(e);
		expect(app.calculateForDisplay).toHaveBeenCalledTimes(1);
	});

	it('works correctly when "AC" is clicked', () => {
		const app = new App();
		app.clearAll = jest.fn();
		const e = {
			target: { innerHTML: 'AC' },
		};
		app.onClick(e);
		expect(app.clearAll).toHaveBeenCalledTimes(1);
	});

	it('works correctly when "+/-" is clicked', () => {
		const app = new App();
		app.positiveOrNegative = jest.fn();
		const e = {
			target: { innerHTML: '+/-' },
		};
		app.onClick(e);
		expect(app.positiveOrNegative).toHaveBeenCalledTimes(1);
	});

	it('works correctly when "%" is clicked', () => {
		const app = new App();
		app.percent = jest.fn();
		const e = {
			target: { innerHTML: '%' },
		};
		app.onClick(e);
		expect(app.percent).toHaveBeenCalledTimes(1);
	});

	it('works correctly when "+" is clicked', () => {
		const app = new App();
		app.setOperation = jest.fn();
		const e = {
			target: { innerHTML: '+' },
		};
		app.onClick(e);
		expect(app.setOperation).toHaveBeenCalledWith('+');
	});

	it('works correctly when "-" is clicked', () => {
		const app = new App();
		app.setOperation = jest.fn();
		const e = {
			target: { innerHTML: '-' },
		};
		app.onClick(e);
		expect(app.setOperation).toHaveBeenCalledWith('-');
	});

	it('works correctly when "x" is clicked', () => {
		const app = new App();
		app.setOperation = jest.fn();
		const e = {
			target: { innerHTML: 'x' },
		};
		app.onClick(e);
		expect(app.setOperation).toHaveBeenCalledWith('x');
	});

	it('works correctly when "/" is clicked', () => {
		const app = new App();
		app.setOperation = jest.fn();
		const e = {
			target: { innerHTML: '/' },
		};
		app.onClick(e);
		expect(app.setOperation).toHaveBeenCalledWith('/');
	});
});

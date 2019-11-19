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

	const operators = ['+', '-', 'x', '/'];
	operators.forEach(item => {
		it(`works correctly when "${item}" is clicked`, () => {
			const app = new App();
			app.setOperation = jest.fn();
			const e = {
				target: { innerHTML: item },
			};
			app.onClick(e);
			expect(app.setOperation).toHaveBeenCalledWith(item);
		});
	});

	const numbersAndDecimal = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'.',
	];
	numbersAndDecimal.forEach(item => {
		it(`works correctly when "${item}" is clicked`, () => {
			const app = new App();
			app.applyNumberOrDecimal = jest.fn();
			const e = {
				target: { innerHTML: item },
			};
			app.onClick(e);
			expect(app.applyNumberOrDecimal).toHaveBeenCalledWith(item);
		});
	});
});

describe('App function setOperation', () => {
	it('works correctly when "+" passed in with no right operand and isTotaled', () => {
		const app = new App();
		app.state = {
			rightOperand: null,
			operation: null,
			isTotaled: true,
			display: 'whatever',
		};
		app.setState = jest.fn();
		app.setOperation('+');
		expect(app.setState).toHaveBeenCalledWith({
			operation: '+',
			isTotaled: false,
			leftOperand: 'whatever',
		});
	});

	it('works correctly with no right operand and is Not Totaled', () => {
		const app = new App();
		app.state = {
			rightOperand: null,
			operation: null,
			isTotaled: false,
		};
		app.setState = jest.fn();
		app.setOperation('+');
		expect(app.setState).toHaveBeenCalledWith({
			operation: '+',
		});
	});

	it('works correctly with a current operation and no right operand', () => {
		const app = new App();
		app.state = {
			rightOperand: null,
			operation: '-',
		};
		app.setState = jest.fn();
		app.setOperation('+');
		expect(app.setState).not.toHaveBeenCalled();
	});
});

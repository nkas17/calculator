import React from 'react';
import renderer from 'react-test-renderer';
import App, { INIT_STATE } from './App';

beforeEach(() => {
	jest.clearAllMocks();
});

describe('App static function formatTotal', () => {
	it('works correctly with no decimal', () => {
		const total = App.formatTotal(2);
		expect(total).toEqual(2);
	});

	it('works correctly with a decimal', () => {
		const total = App.formatTotal(2.2);
		expect(total).toEqual(2.2);
	});

	it('works correctly with a decimal precision is over 8', () => {
		const total = App.formatTotal(2.12345678912345);
		expect(total).toEqual(2.1234568);
	});
});

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
	it('works correctly with no right operand and isTotaled', () => {
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

describe('App function clearAll', () => {
	it('works correctly', () => {
		const app = new App();
		app.setState = jest.fn();
		app.clearAll();
		expect(app.setState).toHaveBeenCalledWith({
			leftOperand: null,
			rightOperand: null,
			operation: null,
			display: 0,
			isTotaled: false,
		});
	});
});

describe('App function calculateForDisplay', () => {
	it('works correctly when ready to calculate', () => {
		const app = new App();
		app.state = { leftOperand: '1', operation: '+', rightOperand: '1' };
		app.setState = jest.fn();
		app.calculate = jest.fn().mockReturnValue(2);
		app.calculateForDisplay();
		expect(app.calculate).toHaveBeenCalled();
		expect(app.setState).toHaveBeenCalledWith({
			leftOperand: null,
			rightOperand: null,
			operation: null,
			display: '2',
			isTotaled: true,
		});
	});

	it('works correctly when not ready to calculate with rightOperand null', () => {
		const app = new App();
		app.state = { leftOperand: '1', operation: '+', rightOperand: null };
		app.setState = jest.fn();
		app.calculate = jest.fn();
		app.calculateForDisplay();
		expect(app.calculate).not.toHaveBeenCalled();
		expect(app.setState).not.toHaveBeenCalled();
	});

	it('works correctly when not ready to calculate with operation null', () => {
		const app = new App();
		app.state = { leftOperand: '1', operation: null };
		app.setState = jest.fn();
		app.calculate = jest.fn();
		app.calculateForDisplay();
		expect(app.calculate).not.toHaveBeenCalled();
		expect(app.setState).not.toHaveBeenCalled();
	});

	it('works correctly when not ready to calculate with leftOperand null', () => {
		const app = new App();
		app.state = { leftOperand: null };
		app.setState = jest.fn();
		app.calculate = jest.fn();
		app.calculateForDisplay();
		expect(app.calculate).not.toHaveBeenCalled();
		expect(app.setState).not.toHaveBeenCalled();
	});

	it('works correctly when total is Infinity', () => {
		const app = new App();
		app.state = { leftOperand: '1', operation: '/', rightOperand: '0' };
		app.setState = jest.fn();
		app.calculate = jest.fn().mockReturnValue('Infinity');
		app.calculateForDisplay();
		expect(app.calculate).toHaveBeenCalled();
		expect(app.setState).toHaveBeenCalledWith({
			leftOperand: null,
			rightOperand: null,
			operation: null,
			display: 'Not a number',
			isTotaled: true,
		});
	});

	it('works correctly when total is NaN', () => {
		const app = new App();
		app.state = { leftOperand: '1', operation: '/', rightOperand: '.' };
		app.setState = jest.fn();
		app.calculate = jest.fn().mockReturnValue('NaN');
		app.calculateForDisplay();
		expect(app.calculate).toHaveBeenCalled();
		expect(app.setState).toHaveBeenCalledWith({
			leftOperand: null,
			rightOperand: null,
			operation: null,
			display: 'Not a number',
			isTotaled: true,
		});
	});
});

describe('App function percent', () => {
	it('works correctly when applied to rightOperand', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			display: '200',
			leftOperand: '100',
			rightOperand: '200',
		};
		app.percent();
		expect(app.setState).toHaveBeenCalledWith({
			rightOperand: '2',
			display: '2',
		});
	});
	it('works correctly when applied to leftOperand', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			display: '100',
			leftOperand: '100',
			rightOperand: null,
		};
		app.percent();
		expect(app.setState).toHaveBeenCalledWith({
			leftOperand: '1',
			display: '1',
		});
	});
});

describe('App function positiveOrNegative', () => {
	it('works correctly when applied to positive rightOperand', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			display: '200',
			leftOperand: '100',
			rightOperand: '200',
		};
		app.positiveOrNegative();
		expect(app.setState).toHaveBeenCalledWith({
			rightOperand: '-200',
			display: '-200',
		});
	});
	it('works correctly when applied to negative leftOperand', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			display: '-100',
			leftOperand: '-100',
			rightOperand: null,
		};
		app.positiveOrNegative();
		expect(app.setState).toHaveBeenCalledWith({
			leftOperand: '100',
			display: '100',
		});
	});
});

describe('App function calculate', () => {
	it('works correctly when operation is "+"', () => {
		const app = new App();
		App.formatTotal = jest.fn();
		app.state = {
			operation: '+',
			leftOperand: '100',
			rightOperand: '200',
		};
		app.calculate();
		expect(App.formatTotal).toHaveBeenCalledWith(300);
	});

	it('works correctly when operation is "-"', () => {
		const app = new App();
		App.formatTotal = jest.fn();
		app.state = {
			operation: '-',
			leftOperand: '100',
			rightOperand: '200',
		};
		app.calculate();
		expect(App.formatTotal).toHaveBeenCalledWith(-100);
	});

	it('works correctly when operation is "x"', () => {
		const app = new App();
		App.formatTotal = jest.fn();
		app.state = {
			operation: 'x',
			leftOperand: '100',
			rightOperand: '200',
		};
		app.calculate();
		expect(App.formatTotal).toHaveBeenCalledWith(20000);
	});

	it('works correctly when operation is "/"', () => {
		const app = new App();
		App.formatTotal = jest.fn();
		app.state = {
			operation: '/',
			leftOperand: '100',
			rightOperand: '200',
		};
		app.calculate();
		expect(App.formatTotal).toHaveBeenCalledWith(0.5);
	});

	it('works correctly when operation is unknown', () => {
		const app = new App();
		app.state = {
			operation: '_',
			leftOperand: '100',
			rightOperand: '200',
		};
		expect(app.calculate()).toEqual(0);
		expect(App.formatTotal).not.toHaveBeenCalled();
	});
});

describe('App function setLeftOperand', () => {
	it('works correctly when is not totaled and no leftOperand', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			leftOperand: null,
			isTotaled: false,
		};
		app.setLeftOperand('5');
		expect(app.setState).toHaveBeenCalledWith({
			leftOperand: '5',
			display: '5',
		});
	});

	it('works correctly when is not totaled and there is a leftOperand less than MAX_DISPLAY', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			leftOperand: '5',
			isTotaled: false,
		};
		app.setLeftOperand('5');
		expect(app.setState).toHaveBeenCalledWith({
			leftOperand: '55',
			display: '55',
		});
	});

	it('works correctly when is totaled and no leftOperand', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			leftOperand: null,
			isTotaled: true,
		};
		app.setLeftOperand('5');
		expect(app.setState).toHaveBeenCalledWith({
			...INIT_STATE,
			leftOperand: '5',
			display: '5',
		});
	});

	it('works correctly when is totaled and there is a leftOperand less than MAX_DISPLAY', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			leftOperand: '5',
			isTotaled: true,
		};
		app.setLeftOperand('5');
		expect(app.setState).toHaveBeenCalledWith({
			...INIT_STATE,
			leftOperand: '55',
			display: '55',
		});
	});

	it('works correctly when leftOperand is equal to MAX_DISPLAY', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			leftOperand: '56789123',
			isTotaled: true,
		};
		app.setLeftOperand('5');
		expect(app.setState).not.toHaveBeenCalled();
	});
});

describe('App function setRightOperand', () => {
	it('works correctly when is not totaled and no rightOperand', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			rightOperand: null,
			isTotaled: false,
		};
		app.setRightOperand('5');
		expect(app.setState).toHaveBeenCalledWith({
			rightOperand: '5',
			display: '5',
		});
	});

	it('works correctly when is not totaled and there is a rightOperand less than MAX_DISPLAY', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			rightOperand: '5',
			isTotaled: false,
		};
		app.setRightOperand('5');
		expect(app.setState).toHaveBeenCalledWith({
			rightOperand: '55',
			display: '55',
		});
	});

	it('works correctly when is totaled and no rightOperand', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			rightOperand: null,
			isTotaled: true,
		};
		app.setRightOperand('5');
		expect(app.setState).toHaveBeenCalledWith({
			...INIT_STATE,
			rightOperand: '5',
			display: '5',
		});
	});

	it('works correctly when is totaled and there is a rightOperand less than MAX_DISPLAY', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			rightOperand: '5',
			isTotaled: true,
		};
		app.setRightOperand('5');
		expect(app.setState).toHaveBeenCalledWith({
			...INIT_STATE,
			rightOperand: '55',
			display: '55',
		});
	});

	it('works correctly when rightOperand is equal to MAX_DISPLAY', () => {
		const app = new App();
		app.setState = jest.fn();
		app.state = {
			rightOperand: '56789123',
			isTotaled: true,
		};
		app.setRightOperand('5');
		expect(app.setState).not.toHaveBeenCalled();
	});
});

describe('App function applyNumberOrDecimal', () => {
	it('works correctly when operation exists and operand is a number other than 0', () => {
		const app = new App();
		app.setRightOperand = jest.fn();
		app.setLeftOperand = jest.fn();
		app.state = {
			operation: '+',
		};
		app.applyNumberOrDecimal('5');
		expect(app.setRightOperand).toHaveBeenCalledWith('5');
		expect(app.setLeftOperand).not.toHaveBeenCalled();
	});

	it('works correctly when operation exists and operand is 0', () => {
		const app = new App();
		app.setRightOperand = jest.fn();
		app.setLeftOperand = jest.fn();
		app.state = {
			operation: '+',
		};
		app.applyNumberOrDecimal('0');
		expect(app.setRightOperand).toHaveBeenCalledWith('0');
		expect(app.setLeftOperand).not.toHaveBeenCalled();
	});

	it('works correctly when operation exists and operand is . without a . already being there', () => {
		const app = new App();
		app.setRightOperand = jest.fn();
		app.setLeftOperand = jest.fn();
		app.state = {
			operation: '+',
			display: '1',
		};
		app.applyNumberOrDecimal('.');
		expect(app.setRightOperand).toHaveBeenCalledWith('.');
		expect(app.setLeftOperand).not.toHaveBeenCalled();
	});

	it('works correctly when operation exists and operand is . with a . already being there', () => {
		const app = new App();
		app.setRightOperand = jest.fn();
		app.setLeftOperand = jest.fn();
		app.state = {
			operation: '+',
			display: '1.0',
		};
		app.applyNumberOrDecimal('.');
		expect(app.setRightOperand).not.toHaveBeenCalled();
		expect(app.setLeftOperand).not.toHaveBeenCalled();
	});

	it('works correctly when operation exists and operand is not a number', () => {
		const app = new App();
		app.setRightOperand = jest.fn();
		app.setLeftOperand = jest.fn();
		app.state = {
			operation: '+',
			display: '1.0',
		};
		app.applyNumberOrDecimal('r');
		expect(app.setRightOperand).not.toHaveBeenCalled();
		expect(app.setLeftOperand).not.toHaveBeenCalled();
	});

	it('works correctly when operation does not exist and operand is a number', () => {
		const app = new App();
		app.setRightOperand = jest.fn();
		app.setLeftOperand = jest.fn();
		app.state = {
			operation: null,
		};
		app.applyNumberOrDecimal('5');
		expect(app.setLeftOperand).toHaveBeenCalledWith('5');
		expect(app.setRightOperand).not.toHaveBeenCalled();
	});
});

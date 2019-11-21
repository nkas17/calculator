import React from 'react';
import '../node_modules/normalize.css/normalize.css';
import './styles/main.css';

const MAX_DISPLAY = 8;
export const INIT_STATE = {
	leftOperand: null,
	rightOperand: null,
	operation: null,
	display: 0,
	isTotaled: false,
};

class App extends React.Component {
	static formatTotal(total) {
		if (total.toString().includes('.'))
			return Number.parseFloat(total.toPrecision(MAX_DISPLAY).toString());
		return total;
	}

	constructor(props) {
		super(props);
		this.state = {
			...INIT_STATE,
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		const operand = e.target.innerHTML;
		switch (operand) {
			case 'AC':
				this.clearAll();
				break;
			case '=':
				this.calculateForDisplay();
				break;
			case '+/-':
				this.positiveOrNegative();
				break;
			case '%':
				this.percent();
				break;
			case '+':
			case '-':
			case 'x':
			case '/':
				this.setOperation(operand);
				break;
			default:
				this.applyNumberOrDecimal(operand);
		}
	}

	setOperation(operand) {
		const { rightOperand, operation, isTotaled, display } = this.state;
		if (!operation && rightOperand === null) {
			if (isTotaled) {
				this.setState({
					operation: operand,
					isTotaled: false,
					leftOperand: display,
				});
				return;
			}
			this.setState({ operation: operand });
		}
	}

	setLeftOperand(operand) {
		const { isTotaled, leftOperand } = this.state;
		if (leftOperand === null) {
			this.setState({
				...(isTotaled && INIT_STATE),
				leftOperand: operand,
				display: operand,
			});
			return;
		}
		if (leftOperand.length < MAX_DISPLAY) {
			this.setState({
				...(isTotaled && INIT_STATE),
				leftOperand: leftOperand + operand,
				display: leftOperand + operand,
			});
		}
	}

	setRightOperand(operand) {
		const { isTotaled, rightOperand } = this.state;
		if (rightOperand === null) {
			this.setState({
				...(isTotaled && INIT_STATE),
				rightOperand: operand,
				display: operand,
			});
			return;
		}
		if (rightOperand.length < MAX_DISPLAY) {
			this.setState({
				...(isTotaled && INIT_STATE),
				rightOperand: rightOperand + operand,
				display: rightOperand + operand,
			});
		}
	}

	applyNumberOrDecimal(operand) {
		const { operation, display } = this.state;
		if (
			Number(operand) ||
			operand === '0' ||
			(operand === '.' && !display.includes('.'))
		) {
			if (operation) {
				this.setRightOperand(operand);
				return;
			}
			this.setLeftOperand(operand);
		}
	}

	percent() {
		const { display, leftOperand, rightOperand } = this.state;
		const number = (Number(display) / 100).toString();
		if (leftOperand !== null && rightOperand !== null) {
			this.setState({
				rightOperand: number,
				display: number,
			});
			return;
		}
		this.setState({
			leftOperand: number,
			display: number,
		});
	}

	positiveOrNegative() {
		const { display, leftOperand, rightOperand } = this.state;
		const number = (Number(display) * -1).toString();
		if (leftOperand !== null && rightOperand !== null) {
			this.setState({
				rightOperand: number,
				display: number,
			});
			return;
		}
		this.setState({
			leftOperand: number,
			display: number,
		});
	}

	clearAll() {
		this.setState({
			leftOperand: null,
			rightOperand: null,
			operation: null,
			display: 0,
			isTotaled: false,
		});
	}

	calculateForDisplay() {
		const { leftOperand, operation, rightOperand } = this.state;
		if (leftOperand != null && operation && rightOperand !== null) {
			const total = this.calculate().toString();
			this.setState({
				display:
					total === 'Infinity' || total === 'NaN' ? 'Not a number' : total,
				leftOperand: null,
				rightOperand: null,
				operation: null,
				isTotaled: true,
			});
		}
	}

	calculate() {
		const { leftOperand, rightOperand, operation } = this.state;
		switch (operation) {
			case '+':
				return App.formatTotal(Number(leftOperand) + Number(rightOperand));
			case '-':
				return App.formatTotal(Number(leftOperand) - Number(rightOperand));
			case 'x':
				return App.formatTotal(Number(leftOperand) * Number(rightOperand));
			case '/':
				return App.formatTotal(Number(leftOperand) / Number(rightOperand));
			default:
				return 0;
		}
	}

	render() {
		const { display } = this.state;
		return (
			<main>
				<section className="calc-container">
					<div className="calc-display">{display}</div>
					<div className="calc-button-container">
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							AC
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							+/-
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							%
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							/
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							7
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							8
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							9
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							x
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							4
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							5
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							6
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							-
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							1
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							2
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							3
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							+
						</button>
						<button
							type="button"
							className="calc-button calc-button__zero"
							onClick={this.onClick}
						>
							0
						</button>
						<button
							type="button"
							className="calc-button"
							onClick={this.onClick}
						>
							.
						</button>
						<button
							type="button"
							className="calc-button calc-button__operand"
							onClick={this.onClick}
						>
							=
						</button>
					</div>
				</section>
			</main>
		);
	}
}

export default App;

import React from 'react';
import '../node_modules/normalize.css/normalize.css';
import './styles/main.css';

const MAX_DISPLAY = 8;

class App extends React.Component {
	static formatTotal(total) {
		if (total.toString().includes('.'))
			return Number.parseFloat(total.toPrecision(MAX_DISPLAY).toString());
		return total;
	}

	constructor(props) {
		super(props);
		this.state = {
			leftOperand: null,
			rightOperand: null,
			operation: null,
			display: 0,
			isTotaled: false,
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

	applyNumberOrDecimal(operand) {
		const { leftOperand, rightOperand, operation, isTotaled } = this.state;
		if (Number(operand) || operand === '0' || operand === '.') {
			let clear = {};
			if (isTotaled) {
				clear = {
					leftOperand: null,
					rightOperand: null,
					operation: null,
					display: 0,
					total: 0,
					isTotaled: false,
				};
			}

			// set right
			if (operation && rightOperand === null) {
				this.setState({ ...clear, rightOperand: operand, display: operand });
				return;
			}
			if (
				operation &&
				rightOperand !== null &&
				rightOperand.length < MAX_DISPLAY
			) {
				this.setState({
					...clear,
					rightOperand: rightOperand + operand,
					display: rightOperand + operand,
				});
			}
			// set left
			if (!operation && leftOperand === null) {
				this.setState({ ...clear, leftOperand: operand, display: operand });
				return;
			}
			if (
				!operation &&
				leftOperand !== null &&
				leftOperand.length < MAX_DISPLAY
			) {
				this.setState({
					...clear,
					leftOperand: leftOperand + operand,
					display: leftOperand + operand,
				});
			}
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
				display: total,
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

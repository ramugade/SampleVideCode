// Chat Demo Functionality
class VedangAI {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.resetButton = document.getElementById('resetChat');

        this.conversationState = {
            stage: 'initial',
            userData: {
                currentAge: null,
                retirementAge: null,
                desiredIncome: null,
                currentSavings: null,
                monthlyContribution: null,
                riskTolerance: null
            }
        };

        this.init();
    }

    init() {
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
        this.resetButton.addEventListener('click', () => this.resetChat());

        // Smooth scroll to sections
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    handleSend() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Simulate AI thinking
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 800);
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatar = document.createElement('div');
        avatar.className = `avatar ${type}-avatar`;
        avatar.textContent = type === 'bot' ? 'AI' : 'You';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content;

        if (type === 'user') {
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(avatar);
        } else {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
        }

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Extract numbers from the message
        const numbers = userMessage.match(/\d+/g);

        switch(this.conversationState.stage) {
            case 'initial':
                return this.handleInitialStage(message, numbers);

            case 'income':
                return this.handleIncomeStage(message, numbers);

            case 'savings':
                return this.handleSavingsStage(message, numbers);

            case 'contribution':
                return this.handleContributionStage(message, numbers);

            case 'risk':
                return this.handleRiskStage(message);

            case 'complete':
                return this.generateFinalPlan();

            default:
                return "I'm here to help you plan your retirement. Let's start with your age and retirement goals!";
        }
    }

    handleInitialStage(message, numbers) {
        if (numbers && numbers.length >= 2) {
            this.conversationState.userData.currentAge = parseInt(numbers[0]);
            this.conversationState.userData.retirementAge = parseInt(numbers[1]);
            this.conversationState.stage = 'income';

            const yearsToRetirement = this.conversationState.userData.retirementAge - this.conversationState.userData.currentAge;

            return `<p>Great! So you're ${this.conversationState.userData.currentAge} years old and planning to retire at ${this.conversationState.userData.retirementAge}. That gives us ${yearsToRetirement} years to build your retirement fund.</p>
                    <p>What annual income would you like to have during retirement? Please provide an amount in dollars.</p>`;
        } else if (numbers && numbers.length === 1) {
            return `<p>Thanks! I see you're ${numbers[0]} years old. At what age would you like to retire?</p>`;
        } else {
            return `<p>I'd be happy to help! To create a personalized plan, I need to know your current age and target retirement age. For example, you could say "I'm 35 and want to retire at 65".</p>`;
        }
    }

    handleIncomeStage(message, numbers) {
        if (numbers && numbers.length > 0) {
            const income = parseInt(numbers.join(''));
            this.conversationState.userData.desiredIncome = income;
            this.conversationState.stage = 'savings';

            const monthlyIncome = Math.round(income / 12);

            return `<p>Perfect! You're aiming for $${income.toLocaleString()} per year ($${monthlyIncome.toLocaleString()} per month) in retirement.</p>
                    <p>How much do you currently have saved for retirement? If you're starting from scratch, just say "0" or "nothing yet".</p>`;
        } else {
            return `<p>Please provide a specific dollar amount for your desired annual retirement income. For example: "80000" or "I'd like $120,000 per year".</p>`;
        }
    }

    handleSavingsStage(message, numbers) {
        if (numbers && numbers.length > 0) {
            const savings = parseInt(numbers.join(''));
            this.conversationState.userData.currentSavings = savings;
            this.conversationState.stage = 'contribution';

            if (savings > 0) {
                return `<p>Excellent! You have $${savings.toLocaleString()} already saved. That's a great start!</p>
                        <p>How much can you contribute monthly towards your retirement savings?</p>`;
            } else {
                return `<p>No problem! Starting from zero is perfectly fine - what matters is starting now.</p>
                        <p>How much can you afford to set aside each month for retirement savings?</p>`;
            }
        } else if (message.includes('nothing') || message.includes('zero') || message.includes('0')) {
            this.conversationState.userData.currentSavings = 0;
            this.conversationState.stage = 'contribution';
            return `<p>No problem! Starting from zero is perfectly fine - what matters is starting now.</p>
                    <p>How much can you afford to set aside each month for retirement savings?</p>`;
        } else {
            return `<p>Please tell me how much you currently have saved. You can say a dollar amount or "nothing yet" if you're just starting out.</p>`;
        }
    }

    handleContributionStage(message, numbers) {
        if (numbers && numbers.length > 0) {
            const contribution = parseInt(numbers.join(''));
            this.conversationState.userData.monthlyContribution = contribution;
            this.conversationState.stage = 'risk';

            return `<p>Great! Contributing $${contribution.toLocaleString()} per month will make a significant impact over time.</p>
                    <p>Now, let's assess your risk tolerance. How would you describe your investment approach?</p>
                    <p><strong>Choose one:</strong></p>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                        <li><strong>Conservative</strong> - I prefer safety over growth, minimal risk</li>
                        <li><strong>Moderate</strong> - Balanced approach between growth and security</li>
                        <li><strong>Aggressive</strong> - I'm comfortable with risk for higher potential returns</li>
                    </ul>`;
        } else {
            return `<p>Please provide a monthly dollar amount you can contribute. For example: "500" or "I can save $1000 per month".</p>`;
        }
    }

    handleRiskStage(message) {
        let riskLevel = null;

        if (message.includes('conservative') || message.includes('safe') || message.includes('low risk')) {
            riskLevel = 'conservative';
        } else if (message.includes('moderate') || message.includes('balanced') || message.includes('medium')) {
            riskLevel = 'moderate';
        } else if (message.includes('aggressive') || message.includes('high') || message.includes('growth')) {
            riskLevel = 'aggressive';
        }

        if (riskLevel) {
            this.conversationState.userData.riskTolerance = riskLevel;
            this.conversationState.stage = 'complete';
            return this.generateFinalPlan();
        } else {
            return `<p>Please choose one of the following risk profiles: Conservative, Moderate, or Aggressive.</p>`;
        }
    }

    generateFinalPlan() {
        const data = this.conversationState.userData;
        const yearsToRetirement = data.retirementAge - data.currentAge;
        const monthsToRetirement = yearsToRetirement * 12;

        // Calculate expected returns based on risk tolerance
        const returnRates = {
            conservative: 0.05,  // 5% annual return
            moderate: 0.07,      // 7% annual return
            aggressive: 0.09     // 9% annual return
        };

        const annualReturn = returnRates[data.riskTolerance];
        const monthlyReturn = annualReturn / 12;

        // Calculate future value using compound interest formula
        const futureValue = this.calculateFutureValue(
            data.currentSavings,
            data.monthlyContribution,
            monthlyReturn,
            monthsToRetirement
        );

        // Calculate how much they can withdraw per year (using 4% rule)
        const annualWithdrawal = futureValue * 0.04;
        const monthlyWithdrawal = annualWithdrawal / 12;

        // Check if goal is achievable
        const goalMet = annualWithdrawal >= data.desiredIncome;
        const shortfall = goalMet ? 0 : data.desiredIncome - annualWithdrawal;

        let response = `<p><strong>🎉 Your Personalized Retirement Plan</strong></p>`;
        response += `<p style="margin-top: 1rem;"><strong>Current Situation:</strong></p>`;
        response += `<ul style="padding-left: 1.5rem; margin-top: 0.5rem;">`;
        response += `<li>Current Age: ${data.currentAge}</li>`;
        response += `<li>Retirement Age: ${data.retirementAge}</li>`;
        response += `<li>Years to Retirement: ${yearsToRetirement}</li>`;
        response += `<li>Current Savings: $${data.currentSavings.toLocaleString()}</li>`;
        response += `<li>Monthly Contribution: $${data.monthlyContribution.toLocaleString()}</li>`;
        response += `<li>Risk Profile: ${data.riskTolerance.charAt(0).toUpperCase() + data.riskTolerance.slice(1)}</li>`;
        response += `</ul>`;

        response += `<p style="margin-top: 1rem;"><strong>Projected Results:</strong></p>`;
        response += `<ul style="padding-left: 1.5rem; margin-top: 0.5rem;">`;
        response += `<li>Expected Return: ${(annualReturn * 100).toFixed(1)}% annually</li>`;
        response += `<li>Projected Retirement Fund: <strong>$${Math.round(futureValue).toLocaleString()}</strong></li>`;
        response += `<li>Sustainable Annual Income: <strong>$${Math.round(annualWithdrawal).toLocaleString()}</strong></li>`;
        response += `<li>Monthly Income: <strong>$${Math.round(monthlyWithdrawal).toLocaleString()}</strong></li>`;
        response += `</ul>`;

        if (goalMet) {
            const surplus = annualWithdrawal - data.desiredIncome;
            response += `<p style="margin-top: 1rem; color: #16a34a;"><strong>✅ Goal Status: ON TRACK!</strong></p>`;
            response += `<p>Based on your current plan, you'll exceed your retirement income goal by $${Math.round(surplus).toLocaleString()} per year. You're in great shape!</p>`;
        } else {
            const additionalMonthly = this.calculateRequiredContribution(
                data.currentSavings,
                data.desiredIncome / 0.04,
                monthlyReturn,
                monthsToRetirement
            ) - data.monthlyContribution;

            response += `<p style="margin-top: 1rem; color: #d97706;"><strong>⚠️ Goal Status: SHORTFALL</strong></p>`;
            response += `<p>There's a projected shortfall of $${Math.round(shortfall).toLocaleString()} per year from your target.</p>`;
            response += `<p><strong>Recommendation:</strong> Consider increasing your monthly contribution by $${Math.round(additionalMonthly).toLocaleString()} to meet your retirement goals.</p>`;
        }

        response += `<p style="margin-top: 1rem;"><strong>Next Steps:</strong></p>`;
        response += `<ol style="padding-left: 1.5rem; margin-top: 0.5rem;">`;
        response += `<li>Review your current budget to maximize retirement contributions</li>`;
        response += `<li>Open a tax-advantaged retirement account (401k, IRA)</li>`;
        response += `<li>Set up automatic monthly transfers</li>`;
        response += `<li>Review and rebalance your portfolio annually</li>`;
        response += `<li>Consider meeting with a financial advisor for personalized advice</li>`;
        response += `</ol>`;

        response += `<p style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 0.5rem;">`;
        response += `<strong>📊 Ready to get started?</strong> This is a simplified projection. Real retirement planning involves more factors. Contact us to create a comprehensive, personalized plan!`;
        response += `</p>`;

        // Reset for next conversation
        setTimeout(() => {
            this.conversationState.stage = 'initial';
        }, 1000);

        return response;
    }

    calculateFutureValue(presentValue, payment, rate, periods) {
        // Future value of present amount
        const fvPresent = presentValue * Math.pow(1 + rate, periods);

        // Future value of monthly contributions (annuity)
        const fvPayments = payment * ((Math.pow(1 + rate, periods) - 1) / rate);

        return fvPresent + fvPayments;
    }

    calculateRequiredContribution(presentValue, futureValue, rate, periods) {
        const fvPresent = presentValue * Math.pow(1 + rate, periods);
        const remainingAmount = futureValue - fvPresent;

        if (remainingAmount <= 0) return 0;

        return remainingAmount / ((Math.pow(1 + rate, periods) - 1) / rate);
    }

    resetChat() {
        this.conversationState = {
            stage: 'initial',
            userData: {
                currentAge: null,
                retirementAge: null,
                desiredIncome: null,
                currentSavings: null,
                monthlyContribution: null,
                riskTolerance: null
            }
        };

        this.chatMessages.innerHTML = '';
        this.addMessage(
            `<p>Hello! I'm Vedang, your AI retirement planning advisor. I'm here to help you create a personalized retirement plan.</p>
            <p>To get started, could you tell me your current age and when you'd like to retire?</p>`,
            'bot'
        );
    }
}

// Initialize the chat when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VedangAI();
});

// Add a subtle parallax effect to the hero section
document.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

const timer = document.getElementById('timer-form')

const countdownNumbers = {
	tensMinutes: document.getElementById('tens-minutes'),
	minutes: document.getElementById('minutes'),
	tensSeconds: document.getElementById('tens-seconds'),
	seconds: document.getElementById('seconds'),
}

let interval = null

const startTimer = time => {
	const endTime = Date.now() + time * 60000
	interval = setInterval(() => {
		const currentTime = Date.now()
		const timeRemaining = endTime - currentTime
		if (timeRemaining > 0) {
			setTimerValues({
				tensMinutes: ~~(timeRemaining / 1000 / 60 / 10),
				minutes: ~~((timeRemaining / 1000 / 60) % 10),
				tensSeconds: ~~(((timeRemaining / 1000) % 60) / 10),
				seconds: ~~(((timeRemaining / 1000) % 60) % 10),
			})
		} else {
			clearInterval(interval)
			return
		}
	}, 500)
}

const setTimerValues = ({ tensMinutes, minutes, tensSeconds, seconds }) => {
	countdownNumbers.tensMinutes.textContent = tensMinutes
	countdownNumbers.minutes.textContent = minutes
	countdownNumbers.seconds.textContent = seconds
	countdownNumbers.tensSeconds.textContent = tensSeconds
}

const clearTimer = () => {
	if (interval) clearInterval(interval)
	setTimerValues({
		tensMinutes: '0',
		minutes: '0',
		tensSeconds: '0',
		seconds: '0',
	})
}

timer.addEventListener('submit', event => {
	event.preventDefault()
	const formData = new FormData(event.target)
	const time = formData.get('time')
	clearTimer()
	startTimer(time)
})

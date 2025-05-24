describe('Hello World Test', () => {
	test('should return Hello World string', () => {
		const greeting = 'Hello World';
		expect(greeting).toBe('Hello World');
	});

	test('should concatenate two strings', () => {
		const hello = 'Hello';
		const world = 'World';
		expect(`${hello} ${world}`).toBe('Hello World');
	});
});
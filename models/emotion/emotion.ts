export interface Emotion {
	text: string;
	emoji: string;
	color: string;
}
export const EmotionList: Emotion[] = [
	{ text: 'angry', emoji: '😠', color: '#db642d' },
	{ text: 'energetic', emoji: '😎', color: '#ffd740' },
	{ text: 'happy', emoji: '😄', color: '#95fc95' },
	{ text: 'neutral', emoji: '😐', color: '#eeeeee' },
	{ text: 'relaxed', emoji: '😌', color: '#da6ec8' },
	{ text: 'sad', emoji: '😥', color: '#3ec3ec' },
	{ text: 'sick', emoji: '🤒', color: '#b4843d' },
];

import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ message }: { message: string }) => {
    return <p className={styles.message_text}>{message}</p>;
};

export default ErrorMessage;

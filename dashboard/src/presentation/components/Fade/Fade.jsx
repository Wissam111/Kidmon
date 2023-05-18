import './fade.css'

const Fade = ({ isVisible, duration = 300, children }) => {
    return <div style={{ transition: `all ${duration}ms` }} className={[isVisible ? 'show' : 'render'].join(" ")}>
        {children}
    </div>
}

export default Fade;
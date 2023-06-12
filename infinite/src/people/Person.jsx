import PropTypes from 'prop-types'

function Person({name, hairColor, eyeColor}) {
  return (
    <li>
        {name}
        <ul>
            <li>hair: {hairColor}</li>
            <li>eyes: {eyeColor}</li>
        </ul>
    </li>
  )
}

Person.propTypes = {
    name: PropTypes.string,
    hairColor: PropTypes.string,
    eyeColor: PropTypes.string,
}

export default Person
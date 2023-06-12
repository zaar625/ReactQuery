import PropTypes from 'prop-types'

function Species({name, language, averageLifespan}) {
  return (
    <li>
        {name}
        <ul>
            <li>language: {language}</li>
            <li>average lifespan: {averageLifespan}</li>
        </ul>
    </li>
  )
}

Species.propTypes = {
 name: PropTypes.string,
 language:PropTypes.string,
 averageLifespan:PropTypes.string,
}

export default Species
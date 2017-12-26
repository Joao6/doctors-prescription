angular.module('prescritor')
    .service('Session', function () {
        this.create = function (id, role, code) {
            this.id = id
            this.role = role
            this.roleCode = code
        }

        this.destroy = function () {
            this.id = null
            this.role = null
            this.roleCode = null
        }

        return this
    })